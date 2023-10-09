const btn = document.querySelector('button'),
			tr = document.querySelector('tr'),
			state = document.querySelectorAll('.state');

let table;

let text, preIndex, index;

btn.addEventListener('click', main); 

function processString(inputString) {
    for (const char of inputString) {
        switch (char) {
            case '+':
							return inputString.indexOf('0') == -1 ? 'q10' : 'q30';
            case '*':
                return 'q20';
            default:
                break;
        }
    }
		return 'Error';
}

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
	btn.removeEventListener('click', main);
	btn.textContent = 'стереть';
	input.remove();
	btn.addEventListener('click', clear)
	switch(processString(text)){
		case 'q10':
			setTimeout(q10, 700);
			break;
		case 'q20':
			setTimeout(q20, 700);
			break;
		case 'q30':
			break;
		default:
			break;
	}
};

function clear(){
	location.reload ();
}

// unary Addition
function q10() {
	state[0].textContent = 'q0';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '+':
		case ' ':
			index += 1;
			setTimeout(q10, 700);
			state[1].textContent = 'q0';
			break;
		case '1':
			table[index].textContent = ' ';
			index += 1;
			setTimeout(q11, 700);
			state[1].textContent = 'q1';
			break;
		case '=':
			table[index].textContent = ' ';
			index -= 1;
			setTimeout(q13, 700);
			state[1].textContent = 'q3';
			break;
	}
}
function q11() {
	state[0].textContent = 'q1';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '+':
		case '=':
		case '1':
			index += 1;
			setTimeout(q11, 700);
			state[1].textContent = 'q1';
			break;
		case ' ':
			table[index].textContent = 1;
			tr.insertAdjacentHTML('beforeend', `<td> </td>`);
			table = tr.querySelectorAll('td');
			index -= 1;
			setTimeout(q12, 700);
			state[1].textContent = 'q2';
			break;
	}
}
function q12() {
	state[0].textContent = 'q2';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '+':
		case '=':
			index -= 1;
			setTimeout(q12, 700);
			state[1].textContent = 'q2';
			break;
		case '1':
			index -= 1;
			setTimeout(q12, 700);
			state[1].textContent = 'q2';
			break;
		case ' ':
			index += 1;
			setTimeout(q10, 700);
			state[1].textContent = 'q0';
			break;
	}
}
function q13() {
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
			setTimeout(q13, 700);
			state[1].textContent = 'q3';
			break;
	}
}

// unary Multiplication
function q20() {
	state[0].textContent = 'q0';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '*':
			table[index].textContent = ' ';
			index += 1;
			setTimeout(q24, 500);
			state[1].textContent = 'q4';
			break;
		case ' ':
			index += 1;
			setTimeout(q20, 500);
			state[1].textContent = 'q0';
			break;
		case '1':
			table[index].textContent = ' ';
			index += 1;
			setTimeout(q21, 500);
			state[1].textContent = 'q1';
			break;
		case '=':
			table[index].textContent = '=';
			index -= 1;
			setTimeout(q23, 500);
			state[1].textContent = 'q3';
			break;
	}
}
function q21() {
	state[0].textContent = 'q1';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '*':
			index += 1;
			setTimeout(q20, 500);
			state[1].textContent = 'q0';
			break;
		case '=':
		case '1':
			index += 1;
			setTimeout(q21, 500);
			state[1].textContent = 'q1';
			break;
		case ' ':
			table[index].textContent = 1;
			tr.insertAdjacentHTML('beforeend', `<td> </td>`);
			table = tr.querySelectorAll('td');
			index -= 1;
			setTimeout(q22, 500);
			state[1].textContent = 'q2';
			break;
	}
}
function q22() {
	state[0].textContent = 'q2';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '1':
		case '=':
			index -= 1;
			setTimeout(q22, 500);
			state[1].textContent = 'q2';
			break;
		case ' ':
			index += 1;
			setTimeout(q20, 500);
			state[1].textContent = 'q0';
			break;
	}
}
function q23() {
	state[0].textContent = 'q3';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case ' ':
			table[index].textContent = '1';
			index -= 1;
			setTimeout(q23, 500);
			state[1].textContent = 'q3';
			break; 
		case '*':
			index -= 1;
			setTimeout(q22, 500);
			state[1].textContent = 'q2';
			break; 
	}
}
function q24() {
	state[0].textContent = 'q4';
	table[preIndex].classList.remove('active');
	table[index].classList.add('active');
	preIndex = index;
	switch (table[index].textContent){
		case '1':
		case ' ':
			table[index].textContent = ' ';
			index += 1;
			setTimeout(q24, 500);
			state[1].textContent = 'q4';
			break;
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
	}
}

// binary Addition