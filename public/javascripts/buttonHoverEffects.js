//BUTTON HOVER EFFECTS

const deleteBtnMouseover = (x) => {
    x.style.backgroundColor = '#ee6352'
    x.style.color = '#fff'
    x.style.transition = 'all 0.3s'
}
const deleteBtnMouseout = (x) => {
    x.style.backgroundColor = null
    x.style.color = '#ee6352'
}

const updateBtnMouseover = (x) => {
    x.style.backgroundColor = '#F6ACA2'
    x.style.color = '#fff'
    x.style.transition = 'all 0.3s'
}
const updateBtnMouseout = (x) => {
    x.style.backgroundColor = null
    x.style.color = '#F6ACA2'
}

const boulderBtnMouseover = (x) => {
    x.style.backgroundColor = '#4b597d'
    x.style.transition = 'all 0.3s'
}
const boulderBtnMouseout = (x) => {
    x.style.backgroundColor = '#586994'
}

const routeBtnMouseover = (x) => {
    x.style.backgroundColor = '#496b48'
    x.style.transition = 'all 0.3s'
}
const routeBtnMouseout = (x) => {
    x.style.backgroundColor = '#588157'
}

const signupLinkMouseover = (x) => {
    x.style.color = '#da9990'
    x.style.transition = 'all 0.3s'
}
const signupLinkMouseout = (x) => {
    x.style.color = '#f6aca2'
}