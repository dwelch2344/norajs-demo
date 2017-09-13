#!groovy

def lane = null
def buildNumber = env.BUILD_NUMBER.toInteger()
def version= null




node {
    checkout scm
    sh "git checkout $BUILDBRANCH && git reset --hard origin/$BUILDBRANCH && git pull"

    withNPM(npmrcConfig:'default-npmrc') {
      version = sh(
        script: 'cat package.json | jq -r .version | cut -f1 -d"-"',
        returnStdout: true
      ).trim()
      version = "$version-b$buildNumber"
      sh "npm version $version"
    }

    parallel compile: {
        stage('Build') {
            echo "Got $version"
            // TODO run tests
        }
    }
    stage('Publish') {
       withNPM(npmrcConfig:'default-npmrc') {
         sh "npm publish"
       }
    }
    // stage('Publish') {
    //    withNPM(npmrcConfig:'default-npmrc') {
    //      sh "npm publish"
    //    }
    // }
}
