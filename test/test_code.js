
function getAnswer(customers){
	//user code goes here	    
}


function checkTestCases(){
	    var test_cases =[
		            {array: [1,2,3], answer: 6},
		            {array:[4,5,2,6,1,7,3,7,2,3], answer: 17},
		            {array:[8, 4, 3, 13, 9, 7, 10, 2, 14, 5], answer: 29}
		            
		        ]
	    
	    
	    for(var i of test_cases){
		            if(getAnswer(i.array) != i.answer){
				                console.log("false");
				            }
		            else{
				                console.log("true");
				            }
		        }
}

checkTestCases();
