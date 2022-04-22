<?php declare(strict_types=1);

use PHPUnit\Framework\TestCase;

# fixtures would have been nice here.

class MessageEntityTest extends TestCase
{
    public function test__findById(): void {
        $model = new \models\MessageEntity();
    }

    public function test__user_set(): void {
        $entity = new \models\MessageEntity();

        $username = 'myself';

        $entity->setUser($username);
        $this->assertEquals(
            $entity->getUser(),
            $username
        );
    }

    public function test__message_set(): void {
        $entity = new \models\MessageEntity();

        $message = 'my important message.';

        $entity->setMessage($message);
        $this->assertEquals(
            $entity->getMessage(),
            $message
        );
    }

    public function test__serialize(): void {
        $entity = new \models\MessageEntity();

        $id = $entity->getId();
        $username = 'myself';
        $message = 'my important message.';

        $expected = json_encode([
            'id' => $id,
            'user' => $username,
            'message' => $message
        ]);

        $entity->setUser($username);
        $entity->setMessage($message);
        $this->assertEquals(
            $entity->serialize(),
            $expected
        );
    }
};
