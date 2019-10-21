let lang = 'en',
    ruWeekDays = ['понедельник', 'вторник' , 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    enWeekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    matrix = [];

/* ВАРИАНТ №1 */
if (lang === 'ru' ) {
  console.log(ruWeekDays);
} else if (lang === 'en') {
  console.log(enWeekDays);
} else {
  console.log('?&$%@#');
}

/* ВАРИАНТ №2 */
switch(lang) {
  case 'ru':
    console.log(ruWeekDays);
    break;
  case 'en':
    console.log(enWeekDays);
    break;
  default:
    console.log('?&$%@#');
}

/* ВАРИАНТ №3 */
matrix['ru'] = ['понедельник', 'вторник' , 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
matrix['en'] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

console.log(matrix[lang]);



/* ЗАДАНИЕ №2 */
let namePerson = 'Артём';

let checking = namePerson === 'Артём' ? 'директор' : namePerson === 'Максим' ? 'преподаватель' : 'студент';

console.log(checking);

