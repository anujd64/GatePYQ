
type QuestionsQueryParams = {
    arr: string[];
    skip: number;
    limit: number;
}
export async function getQuestions({arr,skip,limit}: QuestionsQueryParams) {

    // {
    //     "collection":"questions",
    //     "database":"test",
    //     "dataSource":"db",
    //     "filter": {
    //       "tags": {"$in": ["Computer Network"]}
    //     },
    //     "skip":10,
    //     "limit":5 
    // }

    const filterPredicate = {
        tags: { $in: arr } 
    };
    const data = {
        collection: "questions",
        database:"test",
        dataSource:"db",
        filter:filterPredicate,
        skip:skip,
        limit:limit
    }

    const response = await fetch(process.env.MONGODB_DATA_API_URL+"find",
    {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
			'api-key': process.env.MONGODB_DATA_API_KEY as string
		}
      }
    )

    // "pipeline": [
    //     {
    //     "$match": {
    //       "tags": { "$in": ["Computer Network"] }
    //     }
    //   },
    //   {
    //     "$group": {
    //       "_id": null,
    //       "count": { "$sum": 1 }
    //     }
    //   }
    //   ]
    const data2 = {
        collection: "questions",
        database:"test",
        dataSource:"db",
        pipeline:[
            {$match: filterPredicate},
            {
                    $group: {
                      _id: null,
                      count: { $sum: 1 }
                    }
                }
        ]
    }

    const totalCountResp = await fetch(process.env.MONGODB_DATA_API_URL+"aggregate",
        {
            method: "POST",
            body: JSON.stringify(data2),
            headers: {
                'api-key': process.env.MONGODB_DATA_API_KEY as string
            }
          }
        )

    const resData = await response.json().then(data => data)
    const totalCount =await totalCountResp.json().then(data =>data);

    return  { data: resData.documents, totalCount: totalCount.documents.at(0).count };
    // return resData.documents;
    
}
//test
// const filter = { tags: {$in: ["Computer Network"] } } 
// const skip = 10
// const limit = 10
// getQuestions({filter,skip,limit});


export async function getTags() {

    const data = {
        collection: "tags",
        database:"test",
        dataSource:"db",
    }

    const response = await fetch(process.env.MONGODB_DATA_API_URL+"find",
    {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
			'api-key': process.env.MONGODB_DATA_API_KEY as string
		}
      }
    )

    const data2 = {
        collection: "questions",
        database:"test",
        dataSource:"db",
        pipeline:[
            {$match: {}},
            {
                    $group: {
                      _id: null,
                      count: { $sum: 1 }
                    }
                }
        ]
    }

    const resData = await response.json().then(data => data)

    console.log(resData.documents.length)

    return  { data: resData.documents, totalCount: resData.documents.length };
}