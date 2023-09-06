//popup
let but = document.querySelector("#master");
let closeBut = document.querySelector("#close");
let textarea = document.querySelector("#textarea");

let inputText = document.querySelector('#lang');
//stats
let t1 = document.querySelector('#t1');
let t2 = document.querySelector('#t2');
let v = document.querySelector('#v');

//radio
let check1 = document.querySelector("#cond");
let check2 = document.querySelector("#gas");

//process
let select1 = document.querySelector("#phase");
let select2 = document.querySelector("#gas_solution");
let select3 = document.querySelector("#none");

//add в-во
let substanceAddBut = document.querySelector("#add");
let substance = document.querySelector("#substance");
let count = document.querySelector("#count");
let select = document.querySelector("#select");
let process = document.querySelector("#process");

//save вещество
let saveBut = document.querySelector("#save");


but.addEventListener("click", function () {
    document.querySelector(".wrapper").classList.add("active");
    document.querySelector(".popup").classList.add("active");

    //Перенос строки в popup
    let str = inputText.value;

    //Значения для полей
    let indexStartValues = str.indexOf("conditions:");
    let startValues = str.slice(indexStartValues);
    if (indexStartValues >= 0) {
        //Индексы для среза температур
        let startT = startValues.indexOf("t ");
        let endT = startT + startValues.slice(startT).indexOf(" K");
        //Индексы для среза объема
        let startV = startValues.indexOf("v ");
        let endV = startV + startValues.slice(startV).indexOf(" m");
        //Срез, очистка пробелов и разбитие по тире "-"
        let strT = startValues.substring(startT + 2, endT).replaceAll('\t', '').replaceAll(' ', '').split('-');
        let strV = startValues.substring(startV + 2, endV).replaceAll('\t', '').replaceAll(' ', '');
        console.log(strV);
        //Вывод значений
        t1.value = strT[0];
        t2.value = strT[1];
        v.value = strV;


        if (process.value == "phase") {
            processValue = "phase";
        } else if (process.value == "gas_solution") {
            processValue = "gas solution";
        } else {
            processValue = "none";
        }
    }


    //Процесс select
    let indexStartSelect = str.indexOf("process:");
    let startSelect = str.slice(indexStartSelect);
    if (indexStartSelect >= 0) {
        if (startSelect.indexOf("phase") >= 0) {
            select1.selected = true;
        } else {
            select1.selected = false;
            if (startSelect.indexOf("gas solution") >= 0) {
                select2.selected = true;
            } else {
                select2.selected = false;
                select3.selected = true;
            }
        }
    }

    //Флажки
    let indexStartCheckboxes = str.indexOf("system:");
    let startCheckboxes = str.slice(indexStartCheckboxes);
    if (indexStartCheckboxes >= 0) {
        let startCheck = startCheckboxes.indexOf("condense");
        let endCheck = startCheckboxes.indexOf("gas");
        check1.checked = startCheck >= 0 ? true : false;

        check2.checked = (endCheck >= 0 && endCheck + 4 != startCheckboxes.indexOf("solution")) ? true : false;

        let max = Math.max(startCheck, endCheck) + indexStartCheckboxes;
        if (str[max + 2] == "s") {
            max = max + 3;

        } else if (str[max + 7] == "e") {
            max = max + 8;
        } else {
            alert("Error!");
        }
        let newStr = str.slice(max, indexStartSelect);
        newStr = newStr.replaceAll("\t", "");
        newStr = newStr.split("\n");
        newStr = newStr.filter(n => n);

        let removeNewStr = [];
        newStr.forEach(el => {
            el = el.split(" ");
            el = el.filter(n => n);
            el = el.join(" ");
            removeNewStr.push(el);
        });
        //newStr = newStr.replace("\n", "");
        //console.log(removeNewStr);
        newStr = removeNewStr.join("\n");
        textarea.value = newStr;

        substanceAddBut.addEventListener("click", function () {
            let subst, cnt;

            if (substance.value == "") {
                subst = "\t";
            } else {
                subst = substance.value;
            }
            if (count.value == "") {
                cnt = "\t";
            } else {
                cnt = count.value;
            }

            let value = subst + ' ' + cnt + ' ' + select.value;
            newStr = newStr + '\n' + value;
            textarea.value = newStr;

        })

    }






})
saveBut.addEventListener("click", function () {
    let fasa, processValue;
    if (check1.checked == true && check2.checked == true) {
        fasa = "condense, gas";
    } else if (check1.checked == true) {
        fasa = "condense";
    } else if (check2.checked == true) {
        fasa = "gas";
    }

    if (process.value == "phase") {
        processValue = "phase";
    } else if (process.value == "gas_solution") {
        processValue = "gas solution";
    } else {
        processValue = "none";
    }
    let substances = String(textarea.value);
    substances = substances.split("\n");
    substances = substances.join("\n\t");

    let newData = "conditions:\n\tt " + t1.value + " - " + t2.value + " K\n\tv " + v.value + " m\nsystem:\n\t" + fasa + "\n\n\t" + substances + "\nprocess:\n\t" + processValue;
    inputText.value = newData;

    document.querySelector(".wrapper").classList.remove("active");
    document.querySelector(".popup").classList.remove("active");
})

closeBut.addEventListener("click", function () {
    document.querySelector(".wrapper").classList.remove("active");
    document.querySelector(".popup").classList.remove("active");
})