require "net/http"

puts "Loading invoices list"
exec("node app.js")
puts "done, now loading PDF files"
file = IO.read "list.txt"
file.split("\n").each do |line|
  puts line
  line = line.strip.split("@")
  #exec("curl -O #{line[1].strip} > invoices/#{line[0]}.pdf")
  uri = URI(line[1])
  Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
    request = Net::HTTP::Get.new uri
    response = http.request request # Net::HTTPResponse object
    IO.write "invoices/#{line[0]}.pdf", response.body
  end
end