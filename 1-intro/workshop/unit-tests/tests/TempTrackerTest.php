<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase
{
    public function test_something()
    {
        $this->assertEquals(42, 42);
    }
    public function test_insert()
    {
        $tempTracker = new TempTracker();
        $tempTracker->insert(45);
        $this->assertEquals($tempTracker->get_temps(), [45]);
    }
    public function test_get_min()
    {
        $tempTracker = new TempTracker();
        $tempTracker->insert(55);
        $tempTracker->insert(45);
        $tempTracker->insert(50);
        $this->assertEquals($tempTracker->get_min(), 45);
    }
    public function test_get_max()
    {
        $tempTracker = new TempTracker();
        $tempTracker->insert(55);
        $tempTracker->insert(45);
        $tempTracker->insert(50);
        $this->assertEquals($tempTracker->get_max(), 55);
    }
    public function test_get_mean()
    {
        $tempTracker = new TempTracker();
        $tempTracker->insert(55);
        $tempTracker->insert(45);
        $tempTracker->insert(50);
        $this->assertEquals($tempTracker->get_mean(), 50.0);
    }
}
