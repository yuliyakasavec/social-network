export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId) {
          return { ...u, ...newObjProps };
        }
        return u;
      })
}

// state.users.map((u) => {
//     if (u.id === action.userId) {
//       return { ...u, followed: true };
//     }
//     return u;
//   })

export const outputDateSeconds = () => {
  const date = new Date()
  let output = String(
     date.getHours()
     + ':' + date.getMinutes()
     + ':' + date.getSeconds()
     + ':' + date.getMilliseconds()
  )
  output = output + ''
  return output
}


export const uniqueIdGetTimeInStringPlusIndex = (index: number | string) => {
  const date = new Date()
  let output = String(date.getTime())
  output = output + '_' + index
  return output
}