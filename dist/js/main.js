const App = {}

const app = Vue.createApp(App)

app.component('app-nav', {
	template: `
		<div class="app__nav app-nav">
			<ul>
				<li>
					<router-link :active="isExactActive" to="/">Home</router-link>
				</li>
				<li>
					<router-link :active="isExactActive" to="/users">Search Users</router-link>
				<li>
			</ul>
		</div>
	`
})

const AppHome = {
	template: `
		<div class="app__home app-home">
			<router-link to="/users">Search Users</router-link>
		</div>
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
				<span v-if="users.length">Total: {{this.usersLength}}</span>
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

		<div class="app-users__empty" v-if="!users.length">
			<p>start search or modify query...</p>
		</div>

		<div class="app__users app-users">
			<div
				class="app-users__pagination app-users-pagination"
				v-if="this.users.length"
			>
				<button @click="onPrev" :disabled="isFirstPage">Prev</button>
				<button @click="onNext" :disabled="isLastPage">Next</button>
			</div>
			
			<div class="app-users__grid" v-if="!loader">
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
						<div class="app-user__button">
							<router-link :to="{ name: 'user', params: { id: user.id }}">Open</router-link>
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="app__loader app-loader" v-if="loader">
			<svg viewBox="25 25 50 50" >
				<circle cx="50" cy="50" r="20"></circle>
			</svg>
		</div>

		
	`,
	data() {
		return {
			search: '',
			sort: 'desc',
			users: [],
			page: 1,
			perPage: 12,
			usersLength: null,
			loader: false
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
		}, 1000),
		async getUsers() {
			if (this.search.length) {
				try {
					this.loader = true
					const {data} = await axios.get(`https://api.github.com/search/users?q=${this.search}+in:login&sort=repositories&order=${this.sort}&per_page=${this.perPage}&page=${this.page}`)
					this.usersLength = data.total_count
					this.users = data.items
					this.loader = false
				} catch (e) {
					console.log('too many requests - ' + e.message)
				}
			} else {
				this.users = []
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
			<div class="app-info__avatar" v-if="user.avatar_url">
				<img :src="user.avatar_url" alt="">
			</div>
			<div class="app-info__block" v-if="user.login">
				<span>Login:</span> {{user.login}}
			</div>
			<div class="app-info__block" v-if="user.name">
				<span>Name:</span> {{user.name}}
			</div>
			<div class="app-info__block" v-if="user.company">
				<span>Company:</span> {{user.company}}
			</div>
			<div class="app-info__block" v-if="user.bio">
				<span>Bio:</span> {{user.bio}}
			</div>
			<div class="app-info__block" v-if="user.email">
				<span>Email:</span> {{user.email}}
			</div>
			<div class="app-info__block" v-if="user.html_url">
				<span>Github:</span> <a target="_blank" :href="user.html_url">{{user.html_url}}</a>
			</div>
			<div class="app-info__block" v-if="user.blog">
				<span>Blog:</span> <a target="_blank" :href="user.blog">{{user.blog}}</a>
			</div>
			<div class="app-info__block" v-if="user.location">
				<span>Location:</span> {{user.location}}
			</div>
			<div class="app-info__block" v-if="user.public_repos">
				<span>Public repos:</span> {{user.public_repos}}
			</div>
			<div class="app-info__block" v-if="user.public_gists">
				<span>Public gists:</span> {{user.public_gists}}
			</div>
			<div class="app-info__block" v-if="user.followers">
				<span>Followers:</span> {{user.followers}}
			</div>
			<div class="app-info__block" v-if="user.created_at">
				<span>Create at:</span> {{user.created_at}}
			</div>
		</div>
	`,
	data() {
		return {}
	},
	methods: {
		async fetchUser() {
			this.$store.dispatch('fetchUser', `https://api.github.com/user/${this.$route.params.id}`)
		}
	},
	computed: {
		user() {
			return this.$store.getters.getUser
		}
	},
	async mounted() {
		await this.fetchUser()
	}
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

const store = Vuex.createStore({
	state() {
		return {
			user: {
				login: null,
				avatar_url: null,
				html_url: null,
				name: null,
				company: null,
				blog: null,
				location: null,
				email: null,
				bio: null,
				public_repos: null,
				public_gists: null,
				followers: null,
				created_at: null
			}
		}
	},
	mutations: {
		setUser(state, payload) {
			state.user = {
				login: payload.login,
				avatar_url: payload.avatar_url,
				html_url: payload.html_url,
				name: payload.name,
				company: payload.company,
				blog: payload.blog,
				location: payload.location,
				email: payload.email,
				bio: payload.bio,
				public_repos: payload.public_repos,
				public_gists: payload.public_gists,
				followers: payload.followers,
				created_at: payload.created_at
			}
		}
	},
	actions: {
		async fetchUser({commit}, payload) {
			const {data} = await axios.get(payload)
			commit('setUser', data)
		}
	},
	getters: {
		getUser(state) {
			return state.user
		}
	}
})

app.use(router)
app.use(store)

app.mount('#app')
