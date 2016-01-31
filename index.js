#!/usr/bin/env node

const fs = require('fs')
const async = require('async')
const flatten = require('lodash').flatten
const parse = require('xml2js').parseString
var posts = []

const readAndJSONify = function(i, callback) {
  var filename = `./${i}.xml`
  parse(fs.readFileSync(filename, 'utf8'), callback)
}

async.map(
  [1,2,3,4],
  readAndJSONify,
  function(err, results){
    results.forEach(result => {
      result.posts.post.forEach(post => {
        posts.push(post['$'])
      })
    })
    process.stdout.write(JSON.stringify(posts, null, 2))
    process.exit()
  }
)
