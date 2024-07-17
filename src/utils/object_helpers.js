export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map((u) => {
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