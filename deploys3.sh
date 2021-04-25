## build
npm run build

## copy build dir
aws s3 cp ./build s3://claytantor.com/ --recursive --region us-west-2

## create the batch files descr
node create_invalidation.js

## invalidate cache
aws cloudfront create-invalidation --distribution-id E3FJ916KNRBNEH --invalidation-batch file://all_files.json