export const transactionReducer = (state, action) => {
    var list = JSON.parse(localStorage.getItem('transactions'))
    switch (action.type) {
        case "INSERT":
            list.push(action.payLoad)
            localStorage.setItem('transactions', JSON.stringify(list))
            return { list, currentIndex: -1 }

        case "UPDATE":
            list[state.currentIndex] = action.payLoad
            localStorage.setItem('transactions', JSON.stringify(list))
            return { list, currentIndex: -1  }

        case "DELETE":
            list.splice(action.payLoad,1)
            localStorage.setItem('transactions', JSON.stringify(list))
            return { list, currentIndex: -1 }

        case "UPDATE-INDEX":
            return { list, currentIndex:action.payLoad }
            
        default:
            return state
    }
}

