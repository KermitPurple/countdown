const els = {
	date: document.querySelector('#date'),
	choose_div: document.querySelector('#choose'),
	countdown_div: document.querySelector('#countdown'),
	countdown_timer: document.querySelector('#timer'),
};

function get_query() {
	const query = {};
	for(const item of window.location.search.split(/&|\?/).filter(substr => substr)){
		let [key, val] = item.split('=').map(decodeURIComponent);
		query[key] = val;
	}
	return query;
}

function set_query(query) {
	const strs = [];
	for (const key in query) {
		strs.push(encodeURI(key) + '=' + encodeURI(query[key]));
	}
	console.log(strs);
	window.location.search = strs.join('&');
}

function start_countdown() {
	set_query({
		date: els.date.value,
	});
}

function get_time_until(date) {
	date += ' PST' // TODO: check timezone stuff
	const end = new Date(date);
	const now = new Date();
	let diff = Math.abs(end - now);
	console.log({date, end, now, diff});
	console.log(diff / 1000 / 60 / 60 / 24);
	let result = '';
	// one year
	if(diff > 365 * 24 * 60 * 60 * 1000) {
		result += (diff / 365 / 24 / 60 / 60 / 1000).toFixed(0);
		result += ' Years'
	// 1 day
	} else if(diff > 24 * 60 * 60 * 1000) {
		result += (diff / 24 / 60 / 60 / 1000).toFixed(0);
		result += ' Days'
	// 1 hr
	} else if(diff > 60 * 60 * 1000) {
		result += (diff / 60 / 60 / 1000).toFixed(2);
		result += ' Hours'
	// 1 min
	} else if(diff > 60 * 1000) {
		result += (diff / 60 / 1000).toFixed(0);
		result += ' Minutes'
	}
	return result;
}

function main(){
	const query = get_query();
	if(query.date === undefined) return;
	els.choose_div.classList.add('hidden');
	els.countdown_div.classList.remove('hidden');
	setInterval(() => {
		els.countdown_timer.innerHTML = get_time_until(query.date);
	}, 1000);
}

main();
