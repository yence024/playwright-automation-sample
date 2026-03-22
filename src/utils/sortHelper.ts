import { Locator, expect } from "@playwright/test";

// export interface SortHelper {
//     verifySort(locator: Locator, type: 'string' | 'number', order: 'asc' | 'desc'): Promise<void>;
// }



export const sortHelper = {
    async verifySort(locator:Locator, type: 'string' | 'number', order: 'asc' |'desc'){
        const values = await locator.allInnerTexts();
        
        const proceed = values.map(v => {
            const lines = v.split('\n').map(l => l.trim()).filter(Boolean);
            if (type === 'number') {
                const priceline = lines.find(l => l.includes('$'))!;
                    return parseFloat(priceline.replace('$', ''));
            } else {
                return lines[0];
            }
        })
        console.log('UI values:', proceed);
    
        const sort = [...proceed].sort((a,b) => {
            if (type === 'number'){
                return order === 'asc' ? (a as number) - (b as number) : (b as number) - (a as number);
            } else {
                // return order === 'asc'? 
                // (a as string).localeCompare(b as string, undefined, {sensitivity: 'base'}) 
                // : (b as string).localeCompare(a as string, undefined, {sensitivity: 'base'});
                const compare = (a as string).localeCompare(b as string, undefined, {sensitivity: 'base'}  )
                return order === 'asc' ? compare : -compare;
                
            }
        }); console.log('Expected values:', sort);
            
        //assert that the sorted values match the expected order
        expect(sort).toEqual(proceed);
          
    }
}