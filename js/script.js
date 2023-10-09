const btn = document.querySelector('button'),
			tr = document.querySelector('tr'),
			state = document.querySelectorAll('.state');

let table;

let text, preIndex, index;

btn.addEventListener('click', main); 

function main() {
	text = ''; 
	preIndex = 0;
	index = 1;
	const input = document.querySelector('input');

	text = input.value != '' ? ' ' + input.value + '= ' : '';
	input.value = "";

	const tableTemp = document.querySelectorAll('td');
	tableTemp.forEach(td => {
		td.remove();
	});

	for(let i in text) {
		tr.insertAdjacentHTML('beforeend', `<td>${text[i]}</td>`);
	};

	table = tr.querySelectorAll('td');
	table[index].classList.add('active');
	setTimeout(q0, 700);
	btn.removeEventListener('click', main);
	btn.textContent = 'стереть';
	input.remove();
	btn.addEventListener('click', clear)
};

function clear(){
	location.reload ();
}

function q0() {
	state[0].textContent = 'q0';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '+':
		case ' ':
			index += 1;
			setTimeout(q0, 700);
			state[1].textContent = 'q0';
			break;
		case '1':
			table[index].textContent = ' ';
			index += 1;
			setTimeout(q1, 700);
			state[1].textContent = 'q1';
			break;
		case '=':
			table[index].textContent = ' ';
			index -= 1;
			setTimeout(q3, 700);
			state[1].textContent = 'q3';
			break;
	}
}

function q1() {
	state[0].textContent = 'q1';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '+':
		case '=':
		case '1':
			index += 1;
			setTimeout(q1, 700);
			state[1].textContent = 'q1';
			break;
		case ' ':
			table[index].textContent = 1;
			tr.insertAdjacentHTML('beforeend', `<td> </td>`);
			table = tr.querySelectorAll('td');
			index -= 1;
			setTimeout(q2, 700);
			state[1].textContent = 'q2';
			break;
	}
}

function q2() {
	state[0].textContent = 'q2';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '+':
		case '=':
			index -= 1;
			setTimeout(q2, 700);
			state[1].textContent = 'q2';
			break;
		case '1':
			index -= 1;
			setTimeout(q2, 700);
			state[1].textContent = 'q2';
			break;
		case ' ':
			index += 1;
			setTimeout(q0, 700);
			state[1].textContent = 'q0';
			break;
	}
}

function q3() {
	state[0].textContent = 'q3';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '1':
		case '+':
		case '=':
			table[index].textContent = ' ';
			state[1].textContent = '';
			setTimeout( () => {
				table.forEach(td => {
					if(td.textContent == ' ') td.remove();
				});
			state[0].textContent = '';
			btn.removeEventListener('click', clear);
			btn.textContent = 'вычислить';
			btn.insertAdjacentHTML('beforebegin', `<input type="text" placeholder="Введите уравнение"></input>`);
			btn.addEventListener('click', main); 

			}, 1500);
			break;
		case ' ':
			table[index].textContent = ' ';
			index -= 1;
			setTimeout(q3, 700);
			state[1].textContent = 'q3';
			break;
	}
}