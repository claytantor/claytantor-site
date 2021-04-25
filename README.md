




# deploy

## delete old
aws s3api get-bucket-location --bucket claytantor.com
aws s3 rm --recursive s3://claytantor.com --region us-west-2

## build
npm run build

## copy build dir
aws s3 cp ./build s3://claytantor.com/ --recursive --region us-west-2

## invalidate cache
aws cloudfront create-invalidation --distribution-id E3FJ916KNRBNEH --invalidation-batch file://all_files.json
