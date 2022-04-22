<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test_something()
    {
        $this->assertEquals(1337, 1337);
    }
    public function test_with_null()
    {
        $this->assertEquals(flatten([]), [], "Should be []");
    }
    public function test_single_value()
    {
        $this->assertEquals(flatten([5]), [5], "Should be [5]");
    }
    public function test_few_value()
    {
        $this->assertEquals(flatten([1, 2, 3]), [1, 2, 3], "Should be [1, 2, 3]");
    }
    public function test_nested_once()
    {
        $this->assertEquals(flatten([[5]]), [5], "Should be [5]");
    }
    public function test_nested_multiple()
    {
        $this->assertEquals(flatten([4, [5, [6, 7]], [1, 2, 3]]), [4, 5, 6, 7, 1, 2, 3], "Should be [4, 5, 6, 7, 1, 2, 3]");
    }
}
