/**Mocked data */
export default function({faker, url, options, login = faker.internet.userName()}) {
  //Twitter api
  if (/^https:..api.twitter.com.*$/.test(url)) {
    //Get user profile
    if ((/users.by.username/.test(url)) && (options?.headers?.Authorization === "Bearer MOCKED_TOKEN")) {
      console.debug(`metrics/compute/mocks > mocking twitter api result > ${url}`)
      const username = url.match(/username[/](?<username>.*?)[?]/)?.groups?.username ?? faker.internet.userName()
      return ({
        status: 200,
        data: {
          data: {
            profile_image_url: faker.image.urlLoremFlickr({category: "people"}),
            name: faker.person.fullName(),
            verified: faker.datatype.boolean(),
            id: faker.number.int(1000000).toString(),
            username,
          },
        },
      })
    }
    //Get recent tweets
    if ((/tweets.search.recent/.test(url)) && (options?.headers?.Authorization === "Bearer MOCKED_TOKEN")) {
      console.debug(`metrics/compute/mocks > mocking twitter api result > ${url}`)
      return ({
        status: 200,
        data: {
          data: [
            {
              id: faker.number.int(100000000000000).toString(),
              created_at: `${faker.date.recent()}`,
              entities: {
                mentions: [
                  {start: 22, end: 33, username: "siosios"},
                ],
              },
              text: "Checkout metrics from @siosios ! #GitHub",
            },
            {
              id: faker.number.int(100000000000000).toString(),
              created_at: `${faker.date.recent()}`,
              text: faker.lorem.paragraph(),
            },
          ],
          includes: {
            users: [
              {
                id: faker.number.int(100000000000000).toString(),
                name: "siosios",
                username: "siosios",
              },
            ],
          },
          meta: {
            newest_id: faker.number.int(100000000000000).toString(),
            oldest_id: faker.number.int(100000000000000).toString(),
            result_count: 2,
            next_token: "MOCKED_CURSOR",
          },
        },
      })
    }
  }
}
