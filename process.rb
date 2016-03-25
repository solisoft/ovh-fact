require "net/http"
require "fileutils"

year = ARGV[0]
year ||= Time.now.year.to_s

FileUtils.mkdir_p "invoices/#{year}"
file = IO.read "list.csv"
file.split("\n").each do |line|
  line = line.strip.split(";")
  uri = URI(line[1])
  date = line[2]
  amount = line[3].to_f
  if date.split("-")[0] == year
    puts "Exporting #{line[0]}" 
  
    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      request = Net::HTTP::Get.new uri
      response = http.request request
      IO.write "invoices/#{year}/#{line[0]}.pdf", response.body
    end
  end
end
puts "OK"