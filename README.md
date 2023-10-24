# Idoven frontend

To install use: `npm i --legacy-peer-deps`. The legacy dependencies are for testing react hooks and it should be updated in the near future and causes no issues for the time being.

to run locally: `npm run dev`

I've used vite + vitest for the tests with react testing library. I've also used recharts for the chart to be able to customize it as needed.

I've also covered some of the important parts with tests although there are some missing and unfortunately I lost my git history due to a problem with git lfs. This is also the reason why I've chosen to use the file upload instead of reading directly from the repository as it could potentially cause problems.

There are some improvements to be made in the codebase:

1.  Verify that the file is compatible and handle errors from that. Right now we just ask to upload a different file.
2.  Handle missing/incorrect datapoints better
3.  Handle dynamic timestamp sizes.
4.  Handle different file types
