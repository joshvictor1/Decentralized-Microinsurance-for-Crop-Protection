;; Farmer Registration Contract
;; Records details of smallholder operations

(define-data-var next-farmer-id uint u0)

(define-map farmers
  { farmer-id: uint }
  {
    name: (string-utf8 100),
    location: (string-utf8 100),
    farm-size: uint,
    crops: (list 10 (string-utf8 50)),
    registered: bool
  }
)

(define-public (register-farmer
    (name (string-utf8 100))
    (location (string-utf8 100))
    (farm-size uint)
    (crops (list 10 (string-utf8 50))))
  (let ((farmer-id (var-get next-farmer-id)))
    (var-set next-farmer-id (+ farmer-id u1))
    (map-set farmers
      { farmer-id: farmer-id }
      {
        name: name,
        location: location,
        farm-size: farm-size,
        crops: crops,
        registered: true
      }
    )
    (ok farmer-id)
  )
)

(define-read-only (get-farmer (farmer-id uint))
  (map-get? farmers { farmer-id: farmer-id })
)

(define-read-only (is-registered (farmer-id uint))
  (default-to false (get registered (get-farmer farmer-id)))
)

