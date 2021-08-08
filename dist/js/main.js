const App = {}

const app = Vue.createApp(App)

app.component('app-nav', {
	template: `
		<div class="app__nav app-nav">
			<ul>
				<li>
					<router-link to="/">Home</router-link>
				</li>
				<li>
					<router-link to="/users">Users</router-link>
				<li>
			</ul>
		</div>
	`
})

const AppHome = {
	template: `
		<router-link to="/users">Users</router-link>
	`
}

const AppUsers = {
	template: `
		<div class="app__tools app-tools">
			<div class="app__search app-search">
				<label>
					Search
					<input
						type="text"
						style="margin: 0 16px;"
						v-model="search"
						@input="onSearch">
				</label>
			</div>
			<div class="app__sort app-sort">
				<label>
					Sort
					<select
						style="margin: 0 16px;"
						v-model="sort"
						@change="onSort">
						<option value="desc">More repos</option>
						<option value="asc">Less repos</option>
					</select>
				</label>
			</div>
		</div>

		<div class="app__users app-users">
			<div
				class="app__user app-user"
				v-for="user in users"
				:key="user.id"
			>
				<div class="app-user__head">
					<div class="app-user__avatar">
						<img :src="user.avatar_url" alt="">
					</div>
					<div class="app-user__login">{{user.login}}</div>
				</div>
				<div class="app-user__body">
					<router-link :to="{ name: 'user', params: { id: user.id }}">Open</router-link>
				</div>
			</div>

		</div>

		<div
			class="app__pagination app-pagination"
			v-if="this.users.length"
		>
			<button @click="onPrev" :disabled="isFirstPage">Prev</button>
			<button @click="onNext" :disabled="isLastPage">Next</button>
		</div>
	`,
	data() {
		return {
			search: '',
			sort: 'desc',
			users: [],
			page: 1,
			perPage: 12,
			usersLength: null
		}
	},
	methods: {
		async onSort() {
			this.page = 1
			await this.getUsers()
		},
		async onPrev() {
			this.page -= 1
			await this.getUsers()
		},
		async onNext() {
			this.page += 1
			await this.getUsers()
		},
		onSearch: _.debounce(async function () {
			this.page = 1
			await this.getUsers()
		}, 2000),
		async getUsers() {
			if (this.search.length) {
				try {
					const {data} = await axios.get(`https://api.github.com/search/users?q=${this.search}+in:login&sort=repositories&order=${this.sort}&per_page=${this.perPage}&page=${this.page}`)
					this.usersLength = data.total_count
					this.users = data.items
				} catch (e) {
					console.log('too many requests - ' + e.message)
				}
				
			}
		}
	},
	computed: {
		isLastPage() {
			return this.usersLength <= this.page * this.perPage
		},
		isFirstPage() {
			return this.page <= 1
		}
	}
}

const AppInfo = {
	template: `
		<div class="app__info app-info">
			<div class="app-info__avatar">
<!--				<img :src="user.avatar" alt="">-->
			</div>
			<div class="app-info__login">login</div>
		</div>
	`
}

const routes = [
	{path: '/', component: AppHome},
	{path: '/users', component: AppUsers},
	{path: '/user/:id', name: 'user', component: AppInfo},
]

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes
})

app.use(router)
app.mount('#app')