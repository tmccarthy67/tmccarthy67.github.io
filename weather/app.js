var request = require("request");
// request("http://api.openweathermap.org/data/2.5/weather?q=iowa city,ia, usa", function (err, res, data) {
// 	if (err !== null) {
// 		console.log("The error is: " + res);
// 		return;
// 	}
// 	var weather = JSON.parse(data);
// 	var tempF = Math.round(weather.main.temp * 9 / 5 - 459.67);
// 	// console.log("The temperature in Ainsworth is " + tempF + "F");
// });

var getTempInCity = function (cityName, cb) {
	request("http://api.openweathermap.org/data/2.5/weather?q=" + cityName, function (err, res, data) {
		if (err !== null) {
			cb(err);
			return;
		}
		var weather = JSON.parse(data);
		if (weather.cod !== 200) {
			cb( new Error("Where the hell is that?"));
			return;
		}
		console.log(weather);
		var tempF = Math.round(weather.main.temp * 9 / 5 - 459.67);
		cb (null, tempF);
});
};

getTempInCity ("abcdefgh", function (err, temp) {
	if (err !== null) {
		console.log(err);
		return;
	}
	console.log(temp);
})
