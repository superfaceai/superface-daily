name = "test"
version = "0.1.0"

usecase Test {
  input {
    text!
  }

  result {
    url!
    method!
    query!
    headers!
  }

  error {
    title!
    detail
  }
}