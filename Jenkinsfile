pipeline {
    agent {
      label 'docker-agent'
    }
    stages {
        stage('Build') {
            steps {
                echo "🚀 Building from branch: ${env.BRANCH_NAME}"
            }
        }
        stage('Test') {
            steps {
                echo "✅ Running tests..."
            }
        }
    }
    post {
        success {
            echo "✅ Build succeeded!"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
