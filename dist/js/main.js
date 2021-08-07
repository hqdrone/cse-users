const App = {
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
		}
	}
}

Vue.createApp(App).mount('#app')