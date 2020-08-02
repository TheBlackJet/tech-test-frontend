import { isArrayEmpty, getProp, convertUTCTimeToDateString } from './utils';

test("test isArrayEmpty function", () => {
    expect(isArrayEmpty([])).toBe(true);
    expect(isArrayEmpty([0, 1, 2])).toBe(false);
    expect(isArrayEmpty(null)).toBe(true);
    expect(isArrayEmpty(undefined)).toBe(true);
    expect(isArrayEmpty(0)).toBe(true);
    expect(isArrayEmpty('validate')).toBe(true);

    const activities = [
        ['Work', 9],
        ['Eat', 1],
        ['Commute', 2],
        ['Play Game', 1],
        ['Sleep', 7]
    ];

    expect(isArrayEmpty(activities)).toBe(false);
});


test("test getProps function", () => {
    // preparing test data
    const testData = {
        'noodle': ['ramen', 'instance noodle'],
        'game': {
             'game1': 'FIFA 2020',
             'game2': 'Pro Evolution Soccer 2020',
             'game3': 'City Builder 2020'
         }
    }

    expect(getProp(testData, 'noodle')).toEqual(['ramen', 'instance noodle']);
    expect(getProp(testData, 'game.game1')).toEqual('FIFA 2020');
    expect(getProp(testData, 'game.game4', undefined)).toBeUndefined();
    expect(getProp(testData, 'game.game4', null)).toBeNull();
    expect(getProp(testData, 'game.game4', 'nah')).toEqual('nah');
});



test("test convertUTCTimeToLocaleString function", () => {
    // preparing test
    const testData1 = '2018-09-01T15:00:00Z';
    const testData2 = '2019-09-01T17:30:00Z';
    const testData3 = '2018-10-01T12:15:00Z';
    const testData4 = '2018-06-01T13:10:00Z';

    expect(convertUTCTimeToDateString(testData1)).toEqual('Sat Sep 01 2018');
    expect(convertUTCTimeToDateString(testData2)).toEqual('Mon Sep 02 2019');
    expect(convertUTCTimeToDateString(testData3)).toEqual('Mon Oct 01 2018');
    expect(convertUTCTimeToDateString(testData4)).toEqual('Fri Jun 01 2018');
});