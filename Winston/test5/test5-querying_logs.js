        var options = {
                randomNumber : 0.19494054815731943
        };


        // Find items logged between today and yesterday.

	logger.query(options, function (err, results) {
		console.log(results);
	});

        logger.query({}, function (err, results) {
                if (err) {
                        throw err;
                }

                console.log(results);
        });

