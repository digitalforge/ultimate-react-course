import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      console.log(action)
      state.balance += action.payload
    },
    withdraw(state, action) {
      state.balance -= action.payload
    },
    requestLoan(state, action) {
      console.log(action.payload)
      if (state.loan > 0) return
      state.loan += action.payload.loanAmout
      state.loanPurpose = action.payload.loanPurpose
      state.balance += action.payload.loanAmount
    },
    // THIS IS THE PREPARE WAY
    // requestLoan: {
    //   prepare(amount, purpose) {
    //     return {
    //       payload: { amount, purpose },
    //     }
    //   },

    //   reducer(state, action) {
    //     if (state.loan > 0) return
    //     state.loan = action.payload.amount
    //     state.loanPurpose = action.payload.purpose
    //     state.balance += action.payload.amount
    //   },
    // },
    payLoan(state) {
      state.loan = 0
      state.loanPurpose = ''
      state.balance -= state.loan
    },
    convertingCurrency(state) {
      state.isLoading = true
    },
  },
})

console.log(accountSlice)

export const { withdraw, requestLoan, payLoan } = accountSlice.actions

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount }

  return async function (dispatch) {
    dispatch({ type: 'account/convertingCurrency' })

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
    )

    const data = await res.json()
    const converted = data.rates.USD

    dispatch({ type: 'account/deposit', payload: converted })
  }
}

export default accountSlice.reducer
