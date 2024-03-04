let needs = [100, 100, 100, 100]
let isAlive = true
let isSleeping = false
let isExhausted = false

// обновляет потребности и фисксирует концовки
function needsDecay() {
    if (needs[0] <= 0) {
        isAlive = false;
        gameOver('Friend starved to death!', 'img/friend_face_dead.png');
    }
    else if (needs[2] <= 0) {
        isAlive = false;
        gameOver('Friend got sick and died.', 'img/friend_face_dead.png');
    }
    else if (needs[3] <= 0) {
        isAlive = false;
        gameOver('Friend doesn\'t talk to you anymore >:(', 'img/friend_face_angry.png');
    }
    else {
        if (needs[1] <= 0) {
            fallAsleep()
            isExhausted = true
        }
        needs[0] -= 3;
        needs[1] -= 2;
        needs[2] -= 2;
        needs[3] -= 5;
        sleepCheck();
        updateNeeds();
    }
}

// визуально обновляет потребности
function updateNeeds() {
    document.getElementById("hungry-bar").style.width = (needs[0]).toString()+'%';
    document.getElementById("tired-bar").style.width = (needs[1]).toString()+'%';
    document.getElementById("dirty-bar").style.width = (needs[2]).toString()+'%';
    document.getElementById("bored-bar").style.width = (needs[3]).toString()+'%';
}

// меняет мордочку птицы в зависимости от ситуации и применяет нужные эффекты
function changeFace(face, effect) {
    document.getElementById('friend-face').src = face
    switch(effect){
        case 'feed':
            document.getElementById('special-effects').src = 'img/effects_feed.png';
            document.getElementById('special-effects').style.marginLeft = '200px'
            document.getElementById('special-effects').style.marginTop = '20px'
            document.getElementById('special-effects').style.marginBottom = '0px'
            break;
        case 'sleep':
            document.getElementById('special-effects').src = 'img/effects_sleep.png';
            document.getElementById('special-effects').style.marginBottom = '300px'
            document.getElementById('special-effects').style.marginLeft = '300px'
            break;
        case 'bath':
            document.getElementById('special-effects').src = 'img/effects_bath.png';
            document.getElementById('special-effects').style.marginLeft = '0px'
            document.getElementById('special-effects').style.marginTop = '0px'
            document.getElementById('special-effects').style.marginBottom = '0px'
            break;
        case 'pet':
            document.getElementById('special-effects').src = 'img/effects_pet.png';
            document.getElementById('special-effects').style.marginLeft = '40px'
            document.getElementById('special-effects').style.marginTop = '0px'
            document.getElementById('special-effects').style.marginBottom = '150px'
            break;
        case '':
            document.getElementById('special-effects').src = '';
            break;
    }
}

// кормление бедного существа
function feedInteraction() {
    changeFace('img/friend_face_eh.png', 'feed');
    needs[0] += 10;
    if (needs[0] > 100) {needs[0] = 100}
    updateNeeds();
    setTimeout(changeFace, 500, 'img/friend_face.png', '');
}

// помыть птицу
function giveBathInteraction() {
    changeFace('img/friend_face_eh.png', 'bath');
    needs[2] += 30;
    if (needs[2] > 100) {needs[2] = 100}
    updateNeeds();
    setTimeout(changeFace, 500, 'img/friend_face.png', '');
}

// погладить птицу
function petInteraction() {
    changeFace('img/friend_face_eh.png', 'pet');
    needs[3] += 10;
    if (needs[3] > 100) {needs[3] = 100}
    updateNeeds();
    setTimeout(changeFace, 500, 'img/friend_face.png', '');
}

// уложить птицу спать
function putToBedInteraction() {
    if (isSleeping) {wakeUp()}
    else (fallAsleep())
    
}

// регистрируется состояние сна и блокируются кнопки (птицу нельзя кормить, когда она спит)
function fallAsleep() {
    console.log
    isSleeping = true
    changeFace('img/friend_face_sleep.png', 'sleep')
    document.querySelector('.put-to-bed').textContent = 'wake up';
    document.querySelector('.feed').disabled = true
    document.querySelector('.give-bath').disabled = true
    document.querySelector('.pet').disabled = true
}

// птица просыпается
function wakeUp() {
    isSleeping = false
    changeFace('img/friend_face.png', '')
    document.querySelector('.put-to-bed').textContent = 'put to bed';
    document.querySelector('.put-to-bed').disabled = false;
    document.querySelector('.feed').disabled = false
    document.querySelector('.give-bath').disabled = false
    document.querySelector('.pet').disabled = false
}

// проверяет, спит ли птица, и каким сном она спит (уложил ли ее спать игрок, или она сама упала без сил)
// птица самомтоятельно просыпается, когда выспится
function sleepCheck() {
    if (isSleeping) {
        needs[1] += 4;
        needs[3] += 5;
        if (needs[1] > 100) {
            needs[1] = 100;
            isSleeping = false
            wakeUp()
        }
    }

    if (isExhausted) {
        document.getElementById('ending').textContent = 'Friend is too exhausted to stay awake!'
        document.querySelector('.put-to-bed').disabled = true;
        if (needs[1] >= 50) {
            document.querySelector('.put-to-bed').disabled = false;
            document.getElementById('ending').textContent = ''
            isExhausted = false
        }
        }
}

// если голубь живой, потребности падают
function aliveCheck() {
    if (isAlive) {
        needsDecay();
    } 
}

// результаты плохого обращения с живым существом
function gameOver(ending, face){
    document.getElementById('state-info').textContent = 'YOU ARE A TERRIBLE FRIEND'
    changeFace(face)
    document.getElementById('special-effects').src = ''
    document.getElementById('ending').textContent = ending
    document.querySelector('.feed').disabled = true
    document.querySelector('.put-to-bed').disabled = true
    document.querySelector('.give-bath').disabled = true
    document.querySelector('.pet').disabled = true
}

// наряды!
function putOnClothes(item) {
    document.getElementById('friend-outfit').src = 'img/clothes_'+item+".png"
    switch (item) {
        case 'hat':
            document.getElementById('friend-outfit').style.marginBottom = '130px';
            break;
        case 'bow':
            document.getElementById('friend-outfit').style.marginBottom = '130px';
            break;
        case 'scarf':
            document.getElementById('friend-outfit').style.marginBottom = '-100px';
            break;
        case 'glasses':
            document.getElementById('friend-outfit').style.marginBottom = '-10px';
            break;
    }
}

setInterval(aliveCheck, 1000);
