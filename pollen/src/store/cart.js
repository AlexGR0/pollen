export default {
    namespaced: true,
    state: {
        cartList:[]
    },
    mutations: {
        addToCart(state,data){
            let chooseItem={};
            let newData = {}
            for(let k in data.chooseItem){
                if(JSON.stringify(data.chooseItem[k].content)!="{}"){
                    chooseItem[k]=data.chooseItem[k].content[data.chooseItem[k].chooseNum]
                }
            }
            newData={
                id:data.id,
                name:data.name,
                price:data.price,
                imgUrl:data.imgUrl,
                num:data.num,
                chooseItem:chooseItem,
                isChecked:false
            }
            for(let i=0;i<state.cartList.length;i++){
                if(state.cartList[i].id==newData.id){
                    state.cartList[i].num+=1
                    return
                }
            }
            state.cartList.push(newData)
        },
        delItem(state,id){
            state.cartList.forEach((item,index)=>{
                if(item.id==id){
                    state.cartList.splice(index,1)
                }
            })
        }
    },
    actions: {},
    getters: {},
    modules: {}
}