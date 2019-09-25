import directMessagesReducer from './directMessagesReducer';

describe('Testing directMessagesReducer states', () => {
    test('should have default state', () => {
        let action = {};
        let newState = directMessagesReducer(undefined, action)
        expect(newState).toEqual([]);
    })
    test('should return the direct messages', () => {
        let action = { type: "SET_DIRECT_MESSAGES"};
        let newState = directMessagesReducer(undefined, action)
        expect(newState).toEqual(action.payload)
    })
})