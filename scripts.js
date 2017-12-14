	

			new Vue({
				
				el: "#btcjs",
				
				data() {
					return {
						user: "admin",
						btcaddr: "xpub6C7siffRZv7C73jdDnrTnFhUt9qfeadXoHfTBGpMDhoCayVMFcfZL92ZW78KhVAMHwjQ2Evj12fx8QpEW7qk4Fo7wzMxCbaLUNYxzemo5GL",
						balance: "",
						total_recieved: "",
						market_cap: "",
						btc_sent_24: "",
						news_posts: {
							title: [],
							image: [],
							link: [],
							description: [],
						},

					}
				},
				components: {
					'Vue':Vue,
				},
				mounted: function() {this.getBalance(), this.getRecieved(), this.getMarketCap(), this.getSent24(), this.getNews()},
				methods:{
					
					getBalance: function() {
						axios.get("https://blockchain.info/q/addressbalance/" + this.btcaddr + "?cors=true").then(response => {
							var balance = parseInt(response.data) * .00000001;
							this.balance= balance;
						});

					},
					getRecieved: function() {
						axios.get("https://blockchain.info/q/getreceivedbyaddress/" + this.btcaddr + "?cors=true").then(response => {
							var total_recieved = parseInt(response.data) * .00000001;
							this.total_recieved = total_recieved;
						})
					},
					getMarketCap: function() {
						axios.get("https://blockchain.info/q/marketcap?cors=true").then(response=> {
							this.market_cap = response.data;
						})
					},
					getSent24: function() {
						axios.get("https://blockchain.info/q/24hrbtcsent?cors=true").then(response=> {
							this.btc_sent_24 = response.data;
						})
					},
					getNews: function() {
						var r = this;
						axios.get("https://cors-anywhere.herokuapp.com/https://news.google.com/news/rss/headlines/section/q/bitcoin/bitcoin?hl=en&gl=US&ned=us", {headers: {"X-Requested-With": "XMLHttpRequest"}}).then(response => {
							var key = 0;
							xmlItem = $.parseXML(response.data);
							$(xmlItem).find("item").each(function (){
							if (key < 5) {
								var title = $(this).find("title").text();
								var link = $(this).find("link").text();
								console.log(this);
								rawDescription = $(this).find("description");
								descriptionObject = $.parseHTML(rawDescription);
								console.log(descriptionObject);
								Vue.set(r.news_posts.title, key, title);
								Vue.set(r.news_posts.link, key, link)

								key++;
							}
								
							})
						})
						

					}
				},
			});
