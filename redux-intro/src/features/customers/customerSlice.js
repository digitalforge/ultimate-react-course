const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
}

export default function customerReducer(
  state = initialStateCustomer,
  { type, payload },
) {
  switch (type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: payload.fullName,
        nationalID: payload.nationalID,
        createdAt: payload.createdAt,
      }
    case 'customer/updateName':
      return {
        ...state,
        fullName: payload,
      }
    default:
      return state
  }
}

// customer actions

export function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  }
}

export function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName }
}
