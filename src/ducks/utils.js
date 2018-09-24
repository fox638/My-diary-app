import {OrderedMap, Map} from 'immutable'

export function fbDatatoEntities(data, RecordModel = Map) {
    
    return (new OrderedMap(data)).mapEntries(([uid, value]) => {
       
        return [uid, (new RecordModel(value)).set('uid', uid)]
    }
        
        
    )
}