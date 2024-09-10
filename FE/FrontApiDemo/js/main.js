let productsList=[]
let cerrentID
fachData()
function fachData(){
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(res => {
        if(res.message=="done"){
            productsList=res.result
            show_data()
            // console.log(productsList)
        }
      })
}

   function show_data(){
        let dataBakedg=''
        for (let index = 0; index < productsList.length; index++) {
             dataBakedg+= `<tr>
             <td>${productsList[index].prodectName}</td>
             <td>${productsList[index].price}</td>
             <td>${productsList[index].descrption}</td>
             <td><button class="btn btn-danger" onclick="delete_product(${productsList[index].id})" >delete</button>
             <button class="btn btn-warning"onclick="updateProduct(${productsList[index].id},${index})">update</button></td>
            
         </tr>`
            
        }
        document.getElementById("tbody").innerHTML=dataBakedg
       }   

    function add_product(){
        let namePR =document.getElementById("productName").value
        let pricePR=document.getElementById("productPrice").value
        let dscPR =document.getElementById("productDesc").value

        let prodectsend={
            prodectName:namePR,
            price:pricePR,
            descrption:dscPR
        }
        fachAPI("post","products",prodectsend)
        console.log(namePR,pricePR,dscPR);
    }   
    function fachAPI(method,endPoint,data){
        fetch(`http://localhost:3000/${endPoint}`, {
            method:method,
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data) 
        }).then(response => response.json())
        .then(res => {
          if(res.message=="done"){
            fachData()
          }
        })
    }

    function delete_product(id){
        console.log(id);
        fachAPI("delete","products",{id:id})
    }

    function updateProduct(id,index){
        cerrentID=id
        let newProduct=productsList[index]
        console.log(newProduct);
        document.getElementById("productName").value=newProduct.prodectName
        document.getElementById("productPrice").value=newProduct.price
        document.getElementById("productDesc").value=newProduct.descrption
        document.getElementById("add").classList.add("d-none")   
        document.getElementById("update").classList.add("d-block")   
    }
    function addUpdate(){
        let namePR =document.getElementById("productName").value
        let pricePR=document.getElementById("productPrice").value
        let dscPR =document.getElementById("productDesc").value

        let prodectsend={
            prodectName:namePR,
            price:pricePR,
            descrption:dscPR,
            id:cerrentID
        }
        fachAPI("put","products",prodectsend)
        document.getElementById("add").classList.remove("d-none")   
        document.getElementById("update").classList.remove("d-block")  

    }