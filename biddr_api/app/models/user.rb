class User < ApplicationRecord
    has_many :auctions, dependent: :destroy
    has_many :bids, dependent: :destroy

    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true, format: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

    def full_name
        "#{first_name} #{last_name}".strip.titlecase
    end
end