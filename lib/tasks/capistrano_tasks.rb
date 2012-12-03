task :copy_config_files do
  filename = "config/config.yml"
  run "cp #{shared_path}/#{filename} #{release_
  path}/#{filename}"
end

after "deploy:update_code", :copy_config_files
