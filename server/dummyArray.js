
// Array of Objects

const testinfos_id =  "5df5784d9576050610de88d6";

const questionList = [
    { 
        question: 'Who is the national Hero of Philipinese',
        choices:[
            "Antonio Luna", 
            "Jose Rizal",
            "Macario Sakay", 
            "Andres Bonifacio"
        ],
        answer : [
            "Jose Rizal"
        ],
        points: 1,
        timer: 30,
        testinfos_id : testinfos_id
    },
    
    { 
        question: '1 + 1 =  ?',
        choices:[
            "2",
            "3",
            "5", 
            "0"
        ],
        answer : [
            "2"
        ],
        points: 1,
        timer: 30,
        testinfos_id : testinfos_id
    },

    { 
        question: 'What polygon has 3 vertices & 3 sides ?',
        choices:[
            "Pentagon",
            "Square",
            "Hexagon", 
            "Triangle"
        ],
        answer : [
            "Triangle"
        ],
        points: 1,
        timer: 30,
        testinfos_id : testinfos_id
    },

    { 
        question: 'Which word has the correct spelling',
        choices:[
            "Appl", 
            "Aple", 
            "Appe", 
            "Apple"
        ],
        answer : [
            "Apple"
        ],
        points: 1,
        timer: 30,
        testinfos_id : testinfos_id
    },

    { 
        question: '5 * 11 = ?',
        choices:[
            "55", 
            "54", 
            "56", 
            "58"
        ],
        answer : [
            "55"
        ],
        points: 1,
        timer: 30,
        testinfos_id : testinfos_id
    },

    // 5 mins
    { 
        question: '10 * 10 = ?',
        choices:[
            "101",
            "100",
            "109",
            "98",
        ],
        answer : [
            "100"
        ],
        points: 5,
        timer: 60,
        testinfos_id : testinfos_id
    },

    { 
        question: '10 / 10 = ?',
        choices:[
            "10", 
            "2", 
            "20", 
            "1"
        ],
        answer : [
            "1"
        ],
        points: 5,
        timer: 60,
        testinfos_id : testinfos_id
    },

    { 
        question: '10 + 10 = ?',
        choices:[
            "10",
            "2", 
            "20",
            "1"
        ],
        answer : [
            "20"
        ],
        points: 5,
        timer: 60,
        testinfos_id : testinfos_id
    },

    { 
        question: '10 + 101 = ?',
        choices:[
            "111",
            "120",
            "11",
            "112"
        ],
        answer : [
            "111"
        ],
        points: 5,
        timer: 60,
        testinfos_id : testinfos_id
    },
    
    { 
        question: '10 + 70 = ?',
        choices:[
            "90",
            "70",
            "80",
            "60"
        ],
        answer : [
            "80"
        ],
        points: 5,
        timer: 60,
        testinfos_id : testinfos_id
    }
   
]

module.exports = questionList;