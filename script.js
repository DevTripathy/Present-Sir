const formEl = document.querySelector('#form')

const totalClassesEl = document.querySelector('#total_class')
const attendedClassesEl = document.querySelector('#attended_class')

const restartBtn = document.querySelector('#restart')
const popupContainer = document.querySelector('#popup')
const popUpBox = document.querySelector('.resultbox')


formEl.addEventListener('submit', (e) => {
    e.preventDefault()

    const totalClasses = parseInt(totalClassesEl.value)
    const attendedClasses = parseInt(attendedClassesEl.value)
    let attendancePercentage
    if(totalClasses >= attendedClasses) {
        attendancePercentage = calculateAttendance(totalClasses, attendedClasses);
        updateUi(totalClasses, attendedClasses, attendancePercentage);
        showPopUp();
    } else {
        alert("Please Ener a valid number of classes!!!!\nTotal classes must be equal or greater than the classes you've attended!")
    }
})


restartBtn.addEventListener('click', (e) => {
    hidePopUp();
})


// ============================ ALL THE FUNCTION HERE =================================//

function calculateAttendance(totalClasses, attendedClasses){
    const attendancePercentage = ((attendedClasses / totalClasses) * 100).toFixed(2);
    return attendancePercentage;
}

function checkClasses(totalClasses, attendedClasses, attendancePercentage){
    const requiredClasses = Math.ceil((0.75 * totalClasses - attendedClasses) / 0.25);

    if (attendancePercentage < 75) {
        return requiredClasses;
    } else {
        const excessClasses = attendedClasses - Math.floor(0.75 * totalClasses);

        if(excessClasses == 0){
            return excessClasses
        } else{
            return -(excessClasses);
        }
    }
}

function updateUi(totalClasses, attendedClasses, attendancePercentage){
    const popupHeading = document.querySelector('#result-heading')
    const attendance = document.querySelector('#attendance')
    const classes = document.querySelector('#classes-required')

    const requiredClasses = checkClasses(totalClasses, attendedClasses, attendancePercentage);

    if(requiredClasses > 0){
        popupHeading.innerHTML = 'Opps!'
        attendance.innerHTML = `<b>Attendance : </b>${attendancePercentage}%`
        classes.innerHTML = `<b>Required Classes : </b>${requiredClasses}`
        popUpBox.style.borderColor = 'red'
        popUpBox.style.boxShadow = '2px 1px 14px red'
        // showPopUp();
    } else {
        popupHeading.innerHTML = '🎉Congratulation🎉'
        attendance.innerHTML = `<b>Attendance : </b>${attendancePercentage}%`
        classes.innerHTML = `<b>Can Bunk : </b>${-(requiredClasses)} classes`
        popUpBox.style.borderColor = 'rgb(13, 255, 0)'
        popUpBox.style.boxShadow = '2px 1px 14px rgba(13, 255, 0, 0.5)'
    }
}

function showPopUp(){
    popupContainer.classList.remove('popup-closed')
    popUpBox.classList.add('result-open')
    totalClassesEl.value = ''
    attendedClassesEl.value = ''

}

function hidePopUp(){
    popupContainer.classList.add('popup-closed')
    popUpBox.classList.remove('result-open')
}