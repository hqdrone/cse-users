const App = {
	data() {
		return {
			search: '',
			sort: 'desc',
			users: [],
		}
	},
	methods: {
		onSort() {
			this.getUsers()
		},
		onSearch: _.debounce(function () {
			this.getUsers()
		}, 2000),
		async getUsers() {
			if (this.search.length) {
				const {data} = await axios.get(`https://api.github.com/search/users?q=${this.search}&sort=repositories&order=${this.sort}`)
				this.users = data.items
			}
			
		}
	}
}

Vue.createApp(App).mount('#app')
