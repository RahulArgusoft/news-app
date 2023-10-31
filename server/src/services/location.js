const fetch = require("node-fetch");
const api_key = process.env.IPSTACK_API_KEY;
const url = 'http://api.ipstack.com'

module.exports = {
  async getchLocationFromIp(ip = "43.241.194.78") {
    try {

      const ip_data = await fetch(`http://ipcheck-node.eu-4.evennode.com/`)
      
      // const result = await fetch(
      //   `${url}/${ip}?access_key=${api_key}`
      // );

      const result = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`)

      const data = await result.json();
      const { city, country } = data;
      
      return { city, country };
    } catch (error) {
      throw error;
    }
  },
};
