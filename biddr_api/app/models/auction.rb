class Auction < ApplicationRecord
    before_validation :set_defaults
    before_save :capitalize_title
  
    validates :title, presence: true, uniqueness: { case_sensitive: false }
    validates :description, presence: true, length: { minimum: 10 }, uniqueness: { scope: :title}
    validates :reserve_price, numericality: { greater_than: 0 }

    has_many :bids, dependent: :destroy

    belongs_to :user, optional: true
  
    private
  
    def set_defaults
        self.reserve_price ||= 1      
    end
  
    def capitalize_title
        self.title.capitalize!
    end
  end
