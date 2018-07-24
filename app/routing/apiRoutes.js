// Your apiRoutes.js file should contain two routes:

// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic

var newCharacter = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(newCharacter);
    });

    app.post("/api/friends", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 100
        };

        var userData = req.body;
        var userName = userData.name;
        var userPhoto = userData.photo;
        var userScores = userData.scores;

        var totalDifference = 0;

        for (var i = 0; i < newCharacter.length; i++) {

            console.log(newCharacter[i].name);
            totalDifference = 0;

            for (var j = 0; j < newCharacter[i].scores[j]; j++) {

                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(newCharacter[i].scores[j]));

                if (totalDifference <= bestMatch.friendDifference) {

                    bestMatch.name = newCharacter[i].name;
                    bestMatch.photo = newCharacter[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }

        }

        newCharacter.push(userData);

        res.json(bestMatch);

    });

}
