$(document).ready(function() {

	const apiKey = "";

	$("body").on("click", "li", (e) => {
		const type = e.target.innerHTML;
		loadPlaces(type).then((results) => {
			writePlaceToDom(results);
		}).catch((error) => {
			console.log(error);
		});
	});

	$("body").on("click", ".place", (e) => {
		let placeId = e.target.id;
		loadDetail(placeId).then((result) => {
			writeAddressToDom(result.formatted_address);
		});
	});

	const loadDetail = (placeId) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`)
			.done((data) => resolve(data.result))
			.fail((error) => reject(error));
		});
	};

	const loadPlaces = (dropdownType) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.174465,-86.767960&radius=50000&type=${dropdownType}&key=${apiKey}`)
			.done((data) => resolve(data.results))
			.fail((error) => reject(error));
			});
		};

	const writePlaceToDom = (results) => {
		let placeString = "";

		for (let i=0; i < results.length; i++) {
			placeString += `<a href="#"><div id="${results[i].place_id}" class="place">${results[i].name}</div></a>`;
		}

		$("#places-container").html(placeString);
	};


	const writeAddressToDom = (address) => {
		let addressString = `<div>${address}</div>`;
		$("#address-container").append(addressString);
	};











});