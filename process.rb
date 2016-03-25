require "net/http"
FileUtils.mkdir 'invoices' rescue "" 
year = ARGV[0]
file = IO.read "list.csv"
file.split("\n").each do |line|
  puts line
  line = line.strip.split(";")
  uri = URI(line[1])
  date = line[2]
  amount = line[3].to_f
  if date.split("-")[0] == year
    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
      request = Net::HTTP::Get.new uri
      response = http.request request
      IO.write "invoices/#{line[0]}.pdf", response.body
    end
  end
end