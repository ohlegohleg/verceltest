let basket = document.querySelector("#basket");
let ball = document.querySelector("#ball");
let game_container = document.querySelector("#game_container");
let container_width = game_container.clientWidth; // получаем ширину главного контейнера
let user_score = document.getElementById('score')
let current_user_speed = 10
let current_ball_speed = 1


let score = 0;
user_score.innerText += score

document.addEventListener('keydown', (event) => {
	if (event.key === "ArrowLeft") {
		let currentLeft = parseInt(basket.style.left) || 0  // '0px' - string
		let newLeft = Math.max(currentLeft - current_user_speed, 0);
		basket.style.left = `${newLeft}px`;  // `Здесь у вас ${имя_переменной} может быть любой текст` 
	}
	else if (event.key === "ArrowRight") {
		let currentLeft = parseInt(basket.style.left) || 0  // '0px' - string
		let newLeft = Math.min(currentLeft + current_user_speed, container_width - basket.clientWidth);  // [0 до 520] math.min(0, 10)
		basket.style.left = `${newLeft}px`;  
		// math.min(0, 520) 
	}
})

function drop_ball() {
	let newLeft = Math.floor(Math.random()*(container_width - ball.clientWidth));
	ball.style.left = `${newLeft}px`;
	ball.style.top = '0';

}

function check_collision() {
	let basket_rect = basket.getBoundingClientRect();
	let ball_rect = ball.getBoundingClientRect();
	
	if (ball_rect.bottom >= basket_rect.top &&
	ball_rect.left >= basket_rect.left &&
	ball_rect.right <= basket_rect.right) {
		drop_ball();
		score++;
		user_score.innerText = `Ваш счет: ${score}`
		console.log("Ваш счёт:", score);
		if (score > 2){
			current_ball_speed += 2
		}
		else {
			current_ball_speed = 1
		}
	}
}
	

function update_game_area() {

	let currentTop = parseInt(ball.style.top) || 0;
	
	if (currentTop + ball.clientWidth >= 368) {
		drop_ball();
		score--;
		console.log("Ваш счёт:", score);
		user_score.innerText = `Ваш счет: ${score}`
	}
	else {	
		ball.style.top = `${currentTop + current_ball_speed}px`;
		check_collision();
	}
}

drop_ball();
setInterval(update_game_area, 5);
