const GRAPHQL_QUERY = `
query TeochewQuery($simpChin: String, $tradChin: String) {
    genPartialDict(simpChin: $simpChin, tradChin: $tradChin) {
        pinyinChaoyinDictRes
        teochewAudioDictRes
    }
}
`;

export async function genGraphQLQuery(backendHost, simpChin, tradChin) {
    return await fetch(`${backendHost}/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: GRAPHQL_QUERY,
            variables: { simpChin, tradChin },
        }),
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}