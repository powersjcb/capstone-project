class SleepingJob

  def self.queue
    :sloth
  end

  def self.perform
    puts 'I just slept asynchronously'
  end
end
