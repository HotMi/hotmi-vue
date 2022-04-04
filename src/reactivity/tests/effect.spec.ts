import { reactive } from "../reactive"
import { effect } from "../effect"
describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    })
    let nextAge
    effect(() => {
      nextAge = user.age + 10
    })
    expect(nextAge).toBe(20)
    // update
    user.age++
    expect(nextAge).toBe(21)
  })
})
