task :deps do
  sh 'npm install'
end

task :build do
  [16, 128, 512].each do |size|
    sh %W[inkscape
          --export-width #{size} --export-height #{size}
          --export-png public/icon#{size}.png
          images/icon.svg].join ' '
  end

  sh 'npx react-scripts-ts build'
  sh 'npx workbox generateSW workbox-cli-config.js'
end

task deploy: %i[deps build] do
  sh 'npx firebase deploy'
end

task :run do
  sh 'npx react-scripts-ts start'
end

task :test do
  sh 'npx react-scripts-ts test --coverage --env=jsdom --runInBand'
end

task :lint do
  sh 'npx tslint src/**/*.ts{,x}'
  sh 'npx prettier -l src/**/*.{json,ts{,x}}'
end

task :clean do
  sh 'git clean -dfx'
end
